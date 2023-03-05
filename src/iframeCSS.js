export const iframeCSS = `
/* 
 * Optional: Makes the sample page fill the window. 
 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: rgb(104, 104, 104);
}

form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 400px;
  padding: 20px;
}

input {
  width: 100%;
  height: 1.2rem;
  margin-top: 0;
  padding: 0.5em;
  border: 0;
  border-bottom: 2px solid gray;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
}

input:focus {
  border-bottom: 4px solid black;
}

input[type=reset] {
  width: auto;
  height: auto;
  border-bottom: 0;
  background-color: transparent;
  color: rgb(104, 104, 104);
  font-size: 14px;
}

.title {
  width: 100%;
  margin-block-end: 0;
  font-weight: 500;
}

.note {
  width: 100%;
  margin-block-start: 0;
  font-size: 12px;
}

.form-label {
  width: 100%;
  padding: 0.5em;
}

.full-field {
  flex: 400px;
  margin: 15px 0;
}

.slim-field-left {
  flex: 1 150px;
  margin: 15px 15px 15px 0px;
}

.slim-field-right {
  flex: 1 150px;
  margin: 15px 0px 15px 15px;
}

.my-button {
  background-color: #000;
  border-radius: 6px;
  color: #fff;
  margin: 10px;
  padding: 6px 24px;
  text-decoration: none;
}

.my-button:hover {
  background-color: #666;
}

.my-button:active {
  position: relative;
  top: 1px;
}

img.powered-by-google {
  margin: 0.5em;
}
`