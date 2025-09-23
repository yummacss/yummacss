import{Command as e}from"commander";import{existsSync as t,readFileSync as n,writeFileSync as r}from"fs";import{globby as i}from"globby";import{getAllUtils as a}from"@yummacss/api";import{join as o}from"path";import{pathToFileURL as s}from"url";import{z as c}from"zod";import l from"ora";import{transform as u}from"lightningcss";import d from"stringify-object";import f from"chokidar";let p={};function m(){return p}function h(e){p=e}function g(e){let t=JSON.stringify(e);return p.configHash!==t}async function _(e){let t=await i(e),r=new Set;for(let e of t)try{let t=n(e,`utf-8`);v(t).forEach(e=>r.add(e))}catch{continue}return r}function v(e){let t=new Set,n=[/class(?:Name)?=["']([^"']+)["']/g,/class(?:Name)?=\{["']([^"']+)["']\}/g,/class(?:Name)?=\{`([^`]+)`\}/g],r=[/`[^`]*\b([a-z]+-[a-z0-9-]+)\b[^`]*`/g,/"[^"]*\b([a-z]+-[a-z0-9-]+)\b[^"]*"/g,/'[^']*\b([a-z]+-[a-z0-9-]+)\b[^']*'/g],i=[...n,...r];for(let n of i){let r;for(;(r=n.exec(e))!==null;){let e=r[1];e&&e.split(/\s+/).filter(e=>e&&/^[a-z]/.test(e)&&e.includes(`-`)).forEach(e=>t.add(e))}}return Array.from(t)}function y(e,t){let n=[];t.buildOptions.reset&&n.push(`*,
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

`)}function b(e){let t=a(),n=[],r=new Set;for(let i of e){if(r.has(i))continue;let e=S(i,t);e&&(n.push(e),r.add(i))}return n.join(`
`)}function x(e,t){let{prefix:n,properties:r,values:i}=t;if(!e.startsWith(n+`-`))return null;let a=e.slice(n.length+1),o=i[a];if(!o)return null;let s=r.map(e=>`  ${e}: ${o};`).join(`
`);return`.${e} {\n${s}\n}`}function S(e,t){for(let[n,r]of Object.entries(t)){let t=x(e,r);if(t)return t}return null}async function C(e){let t=await _(e.source);return{css:y(t,e),dependencies:e.source}}const w=`yumma.config.mjs`,T=c.object({source:c.array(c.string()).default([``]),output:c.string().default(``),buildOptions:c.object({reset:c.boolean().default(!0),minify:c.boolean().default(!1)}).default({reset:!0,minify:!1})}),E={build:{start:`Building...`,success:(e,t)=>`Build done in ${e}ms. (${t})`,fail:`Build failed.`},init:{fail:`Config failed.`,invalid:`Invalid config.`,notFound:`Config not found.`,success:`Config created.`},watch:{start:`Watching...`,fail:`Watch failed.`},common:{unknownError:`Something went wrong, and we don't know what.`}},D={error:e=>l().fail(e),info:e=>l().info(e),progress:e=>l({spinner:`sand`,color:`white`}).start(e),success:e=>l().succeed(e),warn:e=>l().warn(e)};async function O(){let e=o(process.cwd(),w),n=s(e).href;try{let{default:e}=await import(n);return T.parse(e)}catch(e){throw t(w)?e instanceof c.ZodError&&(D.progress(E.init.invalid).fail(E.init.invalid),process.exit(1)):(D.progress(E.init.notFound).warn(E.init.notFound),process.exit(1)),e}}function k(e,t){return u({filename:`style.css`,code:Buffer.from(e),minify:t.buildOptions.minify,sourceMap:!1}).code.toString()}async function A(e,t=!1){let n=D.progress(E.build.start),i=Date.now();try{let a=e||await O(),o=m(),s=g(a),c;if(t||s||!o.css){let e=await C(a);c=e.css,h({configHash:JSON.stringify(a),css:e.css,dependencies:e.dependencies})}else c=o.css;let l=k(c,a);r(a.output,l),n.succeed(E.build.success(Date.now()-i,a.output))}catch{n.fail(E.build.fail),process.exit(1)}}function j(){let e=T.parse({});return{filename:w,content:`export default ${d(e,{indent:`  `,singleQuotes:!1})};`}}function M(){let e=D.progress(`Initializing config...`);try{let{filename:t,content:n}=j();r(t,n),e.succeed(E.init.success)}catch{e.fail(E.init.fail),process.exit(1)}}let N,P=null,F=new Set;function I(e,t){F.add(e),P&&clearTimeout(P),P=setTimeout(async()=>{F.size>0&&(await A(N,!0),F.clear()),P=null},500)}async function L(){try{N=await O(),await A(N,!0),D.info(E.watch.start);let e=await i(N.source);f.watch(e,{awaitWriteFinish:{pollInterval:50,stabilityThreshold:200},ignored:/(^|[/\\])\../,ignoreInitial:!0,persistent:!0}).on(`add`,e=>I(e,`added`)).on(`change`,e=>I(e,`changed`)).on(`unlink`,e=>I(e,`removed`))}catch{D.error(E.watch.fail),process.exit(1)}}const R=new e;R.name(`yummacss`).description(`Main command`),R.command(`init`).action(M).alias(`i`).description(`Initialize config`),R.command(`build`).action(()=>A().catch(()=>process.exit(1))).alias(`b`).description(`Build styles once`),R.command(`watch`).action(()=>L().catch(()=>process.exit(1))).alias(`w`).description(`Build styles continuously`),R.parse(process.argv);export{};