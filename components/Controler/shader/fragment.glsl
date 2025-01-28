uniform sampler2D uTexture;
uniform float uTime;
uniform float uEnabled;
uniform float uProgress;
varying vec2 vUv;




void main()
{
    // Radial gradient
float radialGradient = distance(vec2(vUv.x,vUv.y*0.5), vec2(0.5)) * uEnabled - 7.0 * uProgress;


    radialGradient = 1.0 - radialGradient;


    // Apply texture
    vec3 textureColor = texture2D(uTexture, vUv).rgb;

    vec3 finalColor = mix(textureColor, vec3(0.0), clamp(radialGradient, 0.0, 1.0));

  
    gl_FragColor = vec4(vec3(finalColor),1.0);
}