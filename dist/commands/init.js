import{writeFileSync as c}from"fs";import{z as t}from"zod";var g=t.object({source:t.array(t.string()).min(1,"At least one source path is required"),output:t.string().min(1,"Output path is required"),buildOptions:t.object({reset:t.boolean().optional(),minify:t.boolean().optional()}).optional()}),r={reset:!0,minify:!1},e={source:[""],output:""};var o={build:{start:"Building...",compiling:"Compiling...",usingCache:"Using cache...",purging:"Purging...",minifying:"Minifying...",success:(n,i)=>`Build done in ${n}ms. (${i})`,fail:"Build failed."},init:{start:"Creating config...",success:"Config created.",fail:"Config failed."},watch:{start:"Watching...",fail:"Watch failed."},common:{unknownError:"Unknown error."}};import a from"ora";var d=a({spinner:"sand"}),s={success:n=>console.log(`\u2714 ${n}`),info:n=>console.log(`\u2139 ${n}`),error:n=>console.log(`\u2717 ${n}`),startSpinner:n=>a({spinner:"sand",color:"white"}).start(n)};function u(){return`export default {
  source: ${JSON.stringify(e.source)},
  output: ${JSON.stringify(e.output)},
  buildOptions: {
    reset: ${r.reset},
    minify: ${r.minify}
  }
}`}function O(){let n=s.startSpinner(o.init.start);try{let i=u();c("yumma.config.js",i),n.succeed(o.init.success)}catch(i){n.fail(o.init.fail),s.error(i instanceof Error?i.message:o.common.unknownError),process.exit(1)}}export{O as init};
