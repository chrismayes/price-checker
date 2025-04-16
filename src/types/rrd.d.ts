// name workaround for issues with react-router-dom v6.4+ and TypeScript with test suite
declare module 'rrd' {
  export * from 'react-router-dom';
}