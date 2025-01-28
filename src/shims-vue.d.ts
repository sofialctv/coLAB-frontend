declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
//   Isso declara que qualquer arquivo .vue pode ser importado e tratado como um componente Vue. A linha const component: DefineComponent<{}, {}, any> está dizendo ao TypeScript que o arquivo .vue é um componente do Vue, mas a tipagem dos dados do componente será tratada como any.