import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-gov-dynamic-subset.min.css");
  * {
font-family: "Pretendard GOV Variable", "Pretendard GOV", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
margin:0;
padding:0;

  }
  
  body,
div,
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
table,
th,
td,
form,
fieldset,
legend,
input,
textarea,
a,
button,
select,
ul,
li,
span,
em,
label,
:before,
:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-text-size-adjust: none;
    font-family: inherit;
    line-height: 1.5;
    letter-spacing: inherit;
}
body {
  overflow-x:hidden;

  width:100vw;
  
  
}
input[type='text'],
input[type='tel'],
input[type='password'],
input[type='file'],
input[type='number'],
input[type='email'],
input[type='date'],
input[type='search'],
textarea {
    -webkit-box-shadow: none;
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-tap-highlight-color: transparent;
}
button {
    cursor: pointer;
    border: none;
    outline:none;
    color:${({ theme }) => theme.colors.White};
    font-family: "Pretendard GOV Variable", "Pretendard GOV", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}
.scroll-container {
  position: relative;
  overflow-y: scroll;
}
&::-webkit-scrollbar {
      /** 스크롤바의 너비 */
      width: 3px;
      overflow: hidden;

    }
    &::-webkit-scrollbar-thumb {
      /* background-color: hsla(0,0%,68%,.5); */

    border-radius: 5px;
    height: 5px;

  
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    } 

  
    a {
      text-decoration:none;
      color: inherit;
    }
    li {
       list-style:none;
    }
`;
