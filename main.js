const vertexShaderText = [
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  '',
  'void main()',
  '{',
  ' gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}'
].join('\n');

const fragmentShaderText = [
  'precision mediump float;',
  '',
  'void main()',
  '{',
  ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
  '}'
].join('\n');

const initDemo = () => {
  const canvas = document.createElement('canvas');
  document.querySelector('body').appendChild(canvas);
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.log("WebGl not supported, falling back on experimental WebGL");
    // gl = canvas.getContext('experimental-gl');
  }

  if (!gl) {
    alert("Your browser does not support WebGL")
  }
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  // gl.viewport(0, 0, window.innerWidth, window.innerHeight);


  canvas.height = 600;
  canvas.width = 800;
  gl.viewport(0, 0, 800, 600);

  // rgba setting the color only 
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader! ', gl.getShaderInfoLog(vertexShader));
    return;
  }
  gl.compileShader(fragmentShader)
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('ERROR linking program!', gl.getProgramInfoLog(program));
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error('ERROR validating program', gl.getProgramInfoLog(program));
  }

  ///
  ///BUFFER
  ///

  const triangleVertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];  // [x, y, (counterclockwise)]
  const trianglevertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglevertexBufferObject); // binding to the active buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);// the buffer takes in 64bits and the vertices is in 32

  const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);  //(attribute location, number of elements, type of elements, bool, size of individual vertex, offset from beginning of a single vertex to this attribute)

  gl.enableVertexAttribArray(positionAttribLocation);

  /// Main render loop

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
