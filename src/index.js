import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

import '!style-loader!css-loader!./../assets/main.css';


ReactDOM.render(
  <Layout/>,
  document.getElementById('app')
);


module.hot.accept();
