"use client";

import { useEffect, useRef } from "react";
import { Clock, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from "three";

type Position = { x: number; y: number; rotate: number };
type Props = { linesGradient?: string[]; enabledWaves?: Array<"top" | "middle" | "bottom">; lineCount?: number | number[]; lineDistance?: number | number[]; animationSpeed?: number; interactive?: boolean; bendRadius?: number; bendStrength?: number; mouseDamping?: number; parallax?: boolean; parallaxStrength?: number; topWavePosition?: Position; middleWavePosition?: Position; bottomWavePosition?: Position };

const vertexShader = `precision highp float;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragmentShader = `
precision highp float;
uniform float iTime;uniform vec3 iResolution;uniform float animationSpeed;
uniform bool enableTop;uniform bool enableMiddle;uniform bool enableBottom;
uniform int topLineCount;uniform int middleLineCount;uniform int bottomLineCount;
uniform float topLineDistance;uniform float middleLineDistance;uniform float bottomLineDistance;
uniform vec3 topWavePosition;uniform vec3 middleWavePosition;uniform vec3 bottomWavePosition;
uniform vec2 iMouse;uniform bool interactive;uniform float bendRadius;uniform float bendStrength;uniform float bendInfluence;
uniform bool parallax;uniform float parallaxStrength;uniform vec2 parallaxOffset;
uniform vec3 lineGradient[8];uniform int lineGradientCount;
mat2 rotate(float r){return mat2(cos(r),sin(r),-sin(r),cos(r));}
vec3 getLineColor(float t){if(lineGradientCount==1)return lineGradient[0];float s=clamp(t,0.0,.9999)*float(lineGradientCount-1);int i=int(floor(s));return mix(lineGradient[i],lineGradient[min(i+1,lineGradientCount-1)],fract(s))*.5;}
float wave(vec2 uv,float offset,vec2 screenUv,vec2 mouseUv,bool bend){float time=iTime*animationSpeed;float amp=sin(offset+time*.2)*.3;float y=sin(uv.x+offset+time*.1)*amp;if(bend){vec2 d=screenUv-mouseUv;float influence=exp(-dot(d,d)*bendRadius);y+=(mouseUv.y-screenUv.y)*influence*bendStrength*bendInfluence;}float m=uv.y-y;return .0175/max(abs(m)+.01,.001)+.01;}
void main(){vec2 baseUv=(2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;baseUv.y*=-1.0;if(parallax)baseUv+=parallaxOffset;vec3 col=vec3(0.0);vec2 mouseUv=vec2(0.0);if(interactive){mouseUv=(2.0*iMouse-iResolution.xy)/iResolution.y;mouseUv.y*=-1.0;}
if(enableBottom){for(int i=0;i<64;i++){if(i>=bottomLineCount)break;float f=float(i);float a=bottomWavePosition.z*log(length(baseUv)+1.0);vec2 p=baseUv*rotate(a);col+=getLineColor(f/max(float(bottomLineCount-1),1.0))*wave(p+vec2(bottomLineDistance*f+bottomWavePosition.x,bottomWavePosition.y),1.5+.2*f,baseUv,mouseUv,interactive)*.2;}}
if(enableMiddle){for(int i=0;i<64;i++){if(i>=middleLineCount)break;float f=float(i);float a=middleWavePosition.z*log(length(baseUv)+1.0);vec2 p=baseUv*rotate(a);col+=getLineColor(f/max(float(middleLineCount-1),1.0))*wave(p+vec2(middleLineDistance*f+middleWavePosition.x,middleWavePosition.y),2.0+.15*f,baseUv,mouseUv,interactive);}}
if(enableTop){for(int i=0;i<64;i++){if(i>=topLineCount)break;float f=float(i);float a=topWavePosition.z*log(length(baseUv)+1.0);vec2 p=baseUv*rotate(a);p.x*=-1.0;col+=getLineColor(f/max(float(topLineCount-1),1.0))*wave(p+vec2(topLineDistance*f+topWavePosition.x,topWavePosition.y),1.0+.2*f,baseUv,mouseUv,interactive)*.1;}}
gl_FragColor=vec4(col,.88);}`;

function hexToVector(hex: string) { const value = hex.replace("#", ""); const expanded = value.length === 3 ? value.split("").map((part) => part + part).join("") : value; return new Vector3(parseInt(expanded.slice(0, 2), 16) / 255, parseInt(expanded.slice(2, 4), 16) / 255, parseInt(expanded.slice(4, 6), 16) / 255); }

export function FloatingLines({ linesGradient = ["#9a4d30", "#ff6c2d", "#ffb02e"], enabledWaves = ["top", "middle", "bottom"], lineCount = [6, 10, 14], lineDistance = [8, 6, 4], animationSpeed = .55, interactive = false, bendRadius = 5, bendStrength = -.5, mouseDamping = .05, parallax = true, parallaxStrength = .08, topWavePosition, middleWavePosition, bottomWavePosition = { x: 2, y: -.7, rotate: -1 } }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current; if (!container) return;
    const countFor = (wave: "top" | "middle" | "bottom") => typeof lineCount === "number" ? lineCount : (lineCount[enabledWaves.indexOf(wave)] ?? 6);
    const distanceFor = (wave: "top" | "middle" | "bottom") => (typeof lineDistance === "number" ? lineDistance : (lineDistance[enabledWaves.indexOf(wave)] ?? .1)) * .01;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25)); renderer.setClearColor(0x000000, 0); renderer.domElement.style.cssText = "width:100%;height:100%;display:block"; container.appendChild(renderer.domElement);
    const targetMouse = new Vector2(-1000, -1000); const currentMouse = new Vector2(-1000, -1000); const targetParallax = new Vector2(); const currentParallax = new Vector2(); let influence = 0; let targetInfluence = 0;
    const uniforms = { iTime:{value:0}, iResolution:{value:new Vector3(1,1,1)}, animationSpeed:{value:animationSpeed}, enableTop:{value:enabledWaves.includes("top")}, enableMiddle:{value:enabledWaves.includes("middle")}, enableBottom:{value:enabledWaves.includes("bottom")}, topLineCount:{value:countFor("top")}, middleLineCount:{value:countFor("middle")}, bottomLineCount:{value:countFor("bottom")}, topLineDistance:{value:distanceFor("top")}, middleLineDistance:{value:distanceFor("middle")}, bottomLineDistance:{value:distanceFor("bottom")}, topWavePosition:{value:new Vector3(topWavePosition?.x ?? 10,topWavePosition?.y ?? .5,topWavePosition?.rotate ?? -.4)}, middleWavePosition:{value:new Vector3(middleWavePosition?.x ?? 5,middleWavePosition?.y ?? 0,middleWavePosition?.rotate ?? .2)}, bottomWavePosition:{value:new Vector3(bottomWavePosition.x,bottomWavePosition.y,bottomWavePosition.rotate)}, iMouse:{value:currentMouse}, interactive:{value:interactive}, bendRadius:{value:bendRadius}, bendStrength:{value:bendStrength}, bendInfluence:{value:0}, parallax:{value:parallax}, parallaxStrength:{value:parallaxStrength}, parallaxOffset:{value:currentParallax}, lineGradient:{value:Array.from({length:8},(_,i)=>hexToVector(linesGradient[i] ?? "#ff6c2d"))}, lineGradientCount:{value:Math.min(linesGradient.length,8)} };
    const scene = new Scene(); const camera = new OrthographicCamera(-1,1,1,-1,0,1); const geometry = new PlaneGeometry(2,2); const material = new ShaderMaterial({uniforms,vertexShader,fragmentShader,transparent:true}); scene.add(new Mesh(geometry,material)); const clock = new Clock();
    const resize = () => { const width=container.clientWidth||1; const height=container.clientHeight||1; renderer.setSize(width,height,false); uniforms.iResolution.value.set(renderer.domElement.width,renderer.domElement.height,1); }; const observer=new ResizeObserver(resize); observer.observe(container); resize();
    const move=(event:PointerEvent)=>{const rect=renderer.domElement.getBoundingClientRect();const x=event.clientX-rect.left;const y=event.clientY-rect.top;const dpr=renderer.getPixelRatio();targetMouse.set(x*dpr,(rect.height-y)*dpr);targetInfluence=1;if(parallax)targetParallax.set(((x-rect.width/2)/rect.width)*parallaxStrength, (-(y-rect.height/2)/rect.height)*parallaxStrength);}; const leave=()=>{targetInfluence=0;}; if(interactive){renderer.domElement.addEventListener("pointermove",move);renderer.domElement.addEventListener("pointerleave",leave);}
    let frame=0; let lastFrame=0; let inView=true; let pageVisible=!document.hidden; const visibilityObserver=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;},{threshold:0}); visibilityObserver.observe(container); const pageVisibility=()=>{pageVisible=!document.hidden;}; document.addEventListener("visibilitychange",pageVisibility);
    const draw=(now=0)=>{if(pageVisible&&inView&&now-lastFrame>=33){lastFrame=now;uniforms.iTime.value=clock.getElapsedTime();if(interactive){currentMouse.lerp(targetMouse,mouseDamping);influence+=(targetInfluence-influence)*mouseDamping;uniforms.bendInfluence.value=influence;}if(parallax){currentParallax.lerp(targetParallax,mouseDamping);}renderer.render(scene,camera);}frame=requestAnimationFrame(draw);};draw();
    return()=>{cancelAnimationFrame(frame);observer.disconnect();visibilityObserver.disconnect();document.removeEventListener("visibilitychange",pageVisibility);if(interactive){renderer.domElement.removeEventListener("pointermove",move);renderer.domElement.removeEventListener("pointerleave",leave);}geometry.dispose();material.dispose();renderer.dispose();container.replaceChildren();};
  },[linesGradient,enabledWaves,lineCount,lineDistance,topWavePosition,middleWavePosition,bottomWavePosition,animationSpeed,interactive,bendRadius,bendStrength,mouseDamping,parallax,parallaxStrength]);
  return <div aria-hidden="true" className="floating-lines-container" ref={containerRef} />;
}
