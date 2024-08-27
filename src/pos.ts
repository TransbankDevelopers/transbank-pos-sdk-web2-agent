import Transbank from 'transbank-pos-sdk';

const pos = new Transbank.POSIntegrado();
pos.setDebug(true);

export default pos;
