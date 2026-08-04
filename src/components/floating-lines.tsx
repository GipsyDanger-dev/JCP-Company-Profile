"use client";

import { useEffect, useRef } from "react";
import { Clock, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from "three";

type WavePosition = { x: number; y: number; rotate: number };
type FloatingLinesProps = {
  linesGradient?: string[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  animationSpeed?: number;
  interactive?: boolean;
  parallax?: boolean;
  parallaxStrength?: number;
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
};

const vertexShader = `void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragmentShader = `
precision highp float;
uniform float iTime; uniform vec3 iResolution; uniform vec2 iMouse; uniform vec2 parallaxOffset;
uniform float animationSpeed; uniform float lineDistance[3]; uniform int lineCount[3]; uniform vec3 wavePosition[3];
uniform vec3 colors[3]; uniform bool interactive; uniform bool parallax;
mat2 rot(float a){return mat2(cos(a),sin(a),-sin(a),cos(a));}
float wave(vec2 uv,float offset,float layer){float amp=.14+layer*.025;float y=sin(uv.x*1.2+offset+iTime*animationSpeed*.35)*amp;return .009/max(abs(uv.y-y),.012);}
void main(){vec2 uv=(2.0*gl_FragCoord.xy-iResolution.xy)/iResolution.y;uv.y*=-1.0;if(parallax)uv+=parallaxOffset;vec3 col=vec3(0.0);for(int layer=0;layer<3;layer++){for(int i=0;i<24;i++){if(i>=lineCount[layer])break;float f=float(i);vec2 p=uv*rot(wavePosition[layer].z*log(length(uv)+1.0));p+=vec2(wavePosition[layer].x+lineDistance[layer]*f,wavePosition[layer].y);float glow=wave(p,1.1+f*.31,float(layer));if(interactive){float cursor=exp(-dot(uv-iMouse,uv-iMouse)*5.0);glow*=1.0+cursor*.7;}col+=colors[layer]*glow;}}gl_FragColor=vec4(col,1.0);}`;

function hexToVector(hex: string) {
  const value = hex.replace("#", "").trim();
  const expanded = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
  return new Vector3(parseInt(expanded.slice(0, 2), 16) / 255, parseInt(expanded.slice(2, 4), 16) / 255, parseInt(expanded.slice(4, 6), 16) / 255);
}

export function FloatingLines({ linesGradient = ["#ffe3aa", "#ff8b43", "#181714"], lineCount = [9, 13, 17], lineDistance = [0.14, 0.1, 0.07], animationSpeed = 0.55, interactive = false, parallax = true, parallaxStrength = 0.08, topWavePosition = { x: -0.2, y: 0.42, rotate: -0.2 }, middleWavePosition = { x: 0.1, y: 0.04, rotate: 0.15 }, bottomWavePosition = { x: 0.35, y: -0.44, rotate: -0.15 } }: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const counts = typeof lineCount === "number" ? [lineCount, lineCount, lineCount] : lineCount;
    const distances = typeof lineDistance === "number" ? [lineDistance, lineDistance, lineDistance] : lineDistance;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    container.appendChild(renderer.domElement);
    const uniforms = {
      iTime: { value: 0 }, iResolution: { value: new Vector3(1, 1, 1) }, iMouse: { value: new Vector2(-10, -10) }, parallaxOffset: { value: new Vector2() }, animationSpeed: { value: animationSpeed },
      lineCount: { value: counts }, lineDistance: { value: distances }, wavePosition: { value: [new Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate), new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate), new Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate)] },
      colors: { value: [hexToVector(linesGradient[0] ?? "#ffe3aa"), hexToVector(linesGradient[1] ?? "#ff8b43"), hexToVector(linesGradient[2] ?? "#181714")] }, interactive: { value: interactive }, parallax: { value: parallax },
    };
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
    scene.add(new Mesh(geometry, material));
    const resize = () => { const width = container.clientWidth || 1; const height = container.clientHeight || 1; renderer.setSize(width, height, false); uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1); };
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    const move = (event: PointerEvent) => { const bounds = container.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width - .5; const y = .5 - (event.clientY - bounds.top) / bounds.height; uniforms.iMouse.value.set(x * 2, y * 2); if (parallax) uniforms.parallaxOffset.value.set(x * parallaxStrength, y * parallaxStrength); };
    if (interactive) container.addEventListener("pointermove", move);
    const clock = new Clock(); let frame = 0;
    const render = () => { uniforms.iTime.value = clock.getElapsedTime(); renderer.render(scene, camera); frame = requestAnimationFrame(render); }; render();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); if (interactive) container.removeEventListener("pointermove", move); geometry.dispose(); material.dispose(); renderer.dispose(); container.replaceChildren(); };
  }, [animationSpeed, bottomWavePosition, interactive, lineCount, lineDistance, linesGradient, middleWavePosition, parallax, parallaxStrength, topWavePosition]);

  return <div aria-hidden="true" className="floating-lines-container" ref={containerRef} />;
}
