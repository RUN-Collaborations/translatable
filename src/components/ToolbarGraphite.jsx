import { useAssumeGraphite } from "font-detect-rhl";
import PropTypes from 'prop-types';

// Firefox on iPadOS is notoriously difficult to autodetect. We can show this button if Firefox is not auto-detected.
export default function ToolbarGraphite(ToolbarGraphiteProps) {
  const { assumeGraphite, handleGraphiteClick } = ToolbarGraphiteProps;

  const isFirefoxDetected = useAssumeGraphite({});

  /**
   iPad userAgent for Firefox = Safari, so usAssumeGraphite returns a false negative.
   So we can let users tell us if they are using Firefox on iPad.
  */

    const uA = navigator.userAgent.toLowerCase();

    console.log('userAgent: ' + uA);
    console.log('maxTouchPointes: ' + navigator.maxTouchPoints);
    console.log('userAgent index of "mac": ' + uA.indexOf('mac'));
    console.log('userAgent index of "iPad": ' + uA.indexOf('ipad'));

    // The maxTouchPoints test will need to change if Macs ever add an official touchscreen.
    const isIpad = ((uA.indexOf('ipad') > -1) || ((uA.indexOf('mac') > -1) && navigator.maxTouchPoints &&  (navigator.maxTouchPoints > 2)));

    const askUser = (!isFirefoxDetected && isIpad ? true : false);
  
  const graphiteSwitch = assumeGraphite ? "Yes" : "No"

  const graphiteButton = (<button style={{height: "4.645em", margin: "0.1em auto"}} id="graphite" value={assumeGraphite} onClick={handleGraphiteClick}>Firefox?<br />{graphiteSwitch}</button>);

  return (
    <>
      {askUser && (<div>{graphiteButton}</div>)}
    </>
  );
}

ToolbarGraphite.propTypes = {
  /** Assume Graphite? */
  assumeGraphite: PropTypes.bool,
  /** Handle Graphite Click */
  handleGraphiteClick: PropTypes.func,
};