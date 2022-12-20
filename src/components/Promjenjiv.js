import React, { useState, useImperativeHandle } from "react";
import PropTypes from 'prop-types'

const Promjenjiv = React.forwardRef((props, ref) => {
  const [vidljivo, postaviVidljivo] = useState(false);

  const sakrij = { display: vidljivo ? "none" : "" };
  const prikazi = { display: vidljivo ? "" : "none" };

  const promjenaVidljivosti = () => {
    postaviVidljivo(!vidljivo);
  };

  useImperativeHandle(ref, () => {
    return { promjenaVidljivosti };
  });

  return (
    <div>
      <div style={sakrij}>
        <button onClick={promjenaVidljivosti}>{props.natpis}</button>
      </div>
      <div style={prikazi} className='promjenjiviSadrzaj'>
        {props.children}
        <button onClick={promjenaVidljivosti}>Odustani</button>
      </div>
    </div>
  );
});

Promjenjiv.propTypes = {
    natpis: PropTypes.string.isRequired
}
export default Promjenjiv;
