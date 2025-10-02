#!/usr/bin/env node
import{Command as e}from"commander";import{existsSync as t,readFileSync as n,writeFileSync as r}from"fs";import{globby as i}from"globby";import{coreUtils as a}from"@yummacss/api";import{z as o}from"zod";import s from"ora";import{join as c}from"path";import{pathToFileURL as l}from"url";import{transform as u}from"lightningcss";import d from"stringify-object";import f from"chokidar";let p={};function m(){return p}function h(e){p=e}function g(e){let t=JSON.stringify(e);return p.configHash!==t}async function _(e){let t=await i(e),r=new Set;for(let e of t)try{let t=n(e,`utf-8`);v(t).forEach(e=>r.add(e))}catch{continue}return r}function v(e){let t=new Set,n=[/class(?:Name)?=["']([^"']+)["']/g,/class(?:Name)?=\{["']([^"']+)["']\}/g,/class(?:Name)?=\{`([^`]+)`\}/g],r=[/`[^`]*\b([a-z]+-[a-z0-9-]+)\b[^`]*`/g,/"[^"]*\b([a-z]+-[a-z0-9-]+)\b[^"]*"/g,/'[^']*\b([a-z]+-[a-z0-9-]+)\b[^']*'/g],i=[...n,...r];for(let n of i){let r;for(;(r=n.exec(e))!==null;){let e=r[1];e&&e.split(/\s+/).filter(e=>e&&/^[a-z]/.test(e)&&e.includes(`-`)).forEach(e=>t.add(e))}}return Array.from(t)}function y(e,t){let n=[];t.buildOptions.reset&&n.push(`*,
*::before,
*::after {
  box-sizing: border-box;
  border: 0 solid;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-family: system-ui, sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  font-family: inherit;
  line-height: 1.5;
}

canvas,
img,
picture,
svg,
video {
  display: block;
  max-width: 100%;
}

button,
input,
optgroup,
select,
textarea {
  background-color: transparent;
  font-family: inherit;
  padding: .5rem;
}

button:not([class]),
input:not([class]),
optgroup:not([class]),
select:not([class]),
textarea:not([class]) {
  border: 1px solid #bfc2c7;
}

a,
button,
input,
select,
summary,
textarea {
  &:focus {
    outline: 2px solid transparent;
  }
}

textarea:not([rows]) {
  min-height: 10em;
}

button {
  cursor: pointer;
}

button:disabled,
input:disabled,
select:disabled,
textarea:disabled {
  cursor: not-allowed;
  opacity: .5;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 1rem;
  font-weight: 600;
  text-wrap: balance;
}

p {
  text-wrap: pretty;
}

b,
strong {
  font-weight: 700;
}

small {
  font-size: 80%;
  line-height: 1.4;
}

pre,
code,
kbd,
samp {
  font-family: monospace;
  font-size: 1em;
}

a {
  color: inherit;
  text-decoration: none;
}

ol,
ul {
  list-style: none;
  padding: 0;
}

th {
  font-size: 1rem;
  font-weight: 600;
}

hr {
  border-top: 1px solid #bfc2c7;
  height: 0;
  margin: 1em 0;
}

details {
  display: block;
}

summary {
  display: list-item;
}`);let r=b(e);return r&&n.push(r),n.join(`

`)}function b(e){let t=a(),n=[],r=new Map,i=new Set;for(let a of e){if(i.has(a))continue;let e=w(a,t);if(e){if(e.mediaQuery){let t=r.get(e.mediaQuery)||[];t.push(e.rule),r.set(e.mediaQuery,t)}else n.push(e.rule);i.add(a)}}for(let[e,t]of r)n.push(`${e} {\n${t.join(`
`)}\n}`);return n.join(`
`)}function x(e,t){let{properties:n,variants:r}=t;if(r?.mediaQueries){for(let i of r.mediaQueries)if(e.startsWith(`${i.prefix}:`)){let r=e.slice(i.prefix.length+1),a=S(r,t);if(a){let t=n.map(e=>`  ${e}: ${a.cssValue};`).join(`
`);return{rule:`  .${C(e)} {\n  ${t}\n  }`,mediaQuery:i.value}}}}if(r?.pseudoClasses){for(let i of r.pseudoClasses)if(e.startsWith(`${i.prefix}:`)){let r=e.slice(i.prefix.length+1),a=S(r,t);if(a){let t=n.map(e=>`  ${e}: ${a.cssValue};`).join(`
`);return{rule:`.${C(e)}${i.value} {\n${t}\n}`}}}}let i=S(e,t);if(i){let t=n.map(e=>`  ${e}: ${i.cssValue};`).join(`
`);return{rule:`.${C(e)} {\n${t}\n}`}}return null}function S(e,t){let{prefix:n,values:r}=t;if(!e.startsWith(n+`-`))return null;let i=e.slice(n.length+1),a=r[i];return a?{cssValue:a}:null}function C(e){return e.replace(/:/g,`\\:`).replace(/\//g,`\\/`)}function w(e,t){for(let[n,r]of Object.entries(t)){let t=x(e,r);if(t)return t}return null}async function T(e){let t=await _(e.source);return{css:y(t,e),dependencies:e.source}}const E=`yumma.config.mjs`,D=o.object({source:o.array(o.string()).default([``]),output:o.string().default(``),buildOptions:o.object({reset:o.boolean().default(!0),minify:o.boolean().default(!1)}).default({reset:!0,minify:!1})}),O={build:{start:`Building...`,success:(e,t)=>`Build done in ${e}ms. (${t})`,fail:`Build failed.`},init:{fail:`Config failed.`,invalid:`Invalid config.`,notFound:`Config not found.`,success:`Config created.`},watch:{start:`Watching...`,fail:`Watch failed.`},common:{unknownError:`Something went wrong, and we don't know what.`}},k={error:e=>s().fail(e),info:e=>s().info(e),progress:e=>s({spinner:`sand`,color:`white`}).start(e),success:e=>s().succeed(e),warn:e=>s().warn(e)};async function A(){let e=c(process.cwd(),E),n=l(e).href;try{let{default:e}=await import(n);return D.parse(e)}catch(e){throw t(E)?e instanceof o.ZodError&&(k.progress(O.init.invalid).fail(O.init.invalid),process.exit(1)):(k.progress(O.init.notFound).warn(O.init.notFound),process.exit(1)),e}}function j(e,t){return u({filename:`style.css`,code:Buffer.from(e),minify:t.buildOptions.minify,sourceMap:!1}).code.toString()}async function M(e,t=!1){let n=k.progress(O.build.start),i=Date.now();try{let a=e||await A(),o=m(),s=g(a),c;if(t||s||!o.css){let e=await T(a);c=e.css,h({configHash:JSON.stringify(a),css:e.css,dependencies:e.dependencies})}else c=o.css;let l=j(c,a);r(a.output,l),n.succeed(O.build.success(Date.now()-i,a.output))}catch{n.fail(O.build.fail),process.exit(1)}}function N(){let e=D.parse({});return{filename:E,content:`export default ${d(e,{indent:`  `,singleQuotes:!1})};`}}function P(){let e=k.progress(`Initializing config...`);try{let{filename:t,content:n}=N();r(t,n),e.succeed(O.init.success)}catch{e.fail(O.init.fail),process.exit(1)}}let F,I=null,L=new Set;function R(e,t){L.add(e),I&&clearTimeout(I),I=setTimeout(async()=>{L.size>0&&(await M(F,!0),L.clear()),I=null},500)}async function z(){try{F=await A(),await M(F,!0),k.info(O.watch.start);let e=await i(F.source);f.watch(e,{awaitWriteFinish:{pollInterval:50,stabilityThreshold:200},ignored:/(^|[/\\])\../,ignoreInitial:!0,persistent:!0}).on(`add`,e=>R(e,`added`)).on(`change`,e=>R(e,`changed`)).on(`unlink`,e=>R(e,`removed`))}catch{k.error(O.watch.fail),process.exit(1)}}const B=new e;B.name(`yummacss`).description(`Main command`),B.command(`init`).action(P).alias(`i`).description(`Initialize config`),B.command(`build`).action(()=>M().catch(()=>process.exit(1))).alias(`b`).description(`Build styles once`),B.command(`watch`).action(()=>z().catch(()=>process.exit(1))).alias(`w`).description(`Build styles continuously`),B.parse(process.argv);export{};