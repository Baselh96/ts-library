import jQuery from '@types/jquery';
import bootstrap from '@types/bootstrap';

declare global {
  const bootstrap: bootstrap;
  const $: jQuery;
  const jQuery: jQuery;
}
