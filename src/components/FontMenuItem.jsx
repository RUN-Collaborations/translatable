import { useState } from "react";
import { PropTypes } from "prop-types";
import { Popover, Typography } from "@mui/material";

export default function FontMenuItem(fontMenuItemProps) {
  const { font } = fontMenuItemProps;

  const [anchorEl, setAnchorEl] = useState(null);
  const [previewFont, setPreviewFont] = useState({ name: "Arial" });

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);    
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const styles = {
    menuItem: {
      width: "13rem",
      display: "flex",
      justifyContent: "space-between",
    },
    previewltr: {
      fontFamily: previewFont.name,
      fontSize: "1em",
      maxWidth: "35vw",
      direction: "LTR",
    },
    previewrtl: {
      fontFamily: previewFont.name,
      fontSize: "1em",
      maxWidth: "35vw",
      direction: "RTL",
    },
  };

  const open = Boolean(anchorEl);

  return (
    <div style={(styles.menuItem, { borderBottom: "1px outset" })}>
      <div
        style={styles.menuItem}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={(e) => {
          handlePopoverOpen(e);
          setPreviewFont(font);
        }}
        onMouseLeave={handlePopoverClose}
      >
        <Typography variant="body2" component="div">
          {font.name}&nbsp;
        </Typography>
        <Typography
          style={{ width: "100%", fontFamily: font.name }}
          noWrap
          variant="body2"
          component="div"
        >
          {font.name}
        </Typography>
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }} style={styles.previewltr}>
          Angel Blind Clique Dunce Enact Furlong Gnome Human Inlet Justin Knoll
          Linden Milliner Number Onset Pneumo Quanta Rhone Snout Tundra Uncle
          Vulcan Whale Xenon Young Zodiac.
        </Typography>
        <hr style={{ width: "90%" }} />
        <Typography sx={{ p: 1 }} style={styles.previewrtl}>
          فِي ٱلْبَدْءِ كَانَ ٱلْكَلِمَةُ، وَٱلْكَلِمَةُ كَانَ عِنْدَ ٱللهِ،
          وَكَانَ ٱلْكَلِمَةُ ٱللهَ. هَذَا كَانَ فِي ٱلْبَدْءِ عِنْدَ ٱللهِ.
          كُلُّ شَيْءٍ بِهِ كَانَ، وَبِغَيْرِهِ لَمْ يَكُنْ شَيْءٌ مِمَّا كَانَ.
          فِيهِ كَانَتِ ٱلْحَيَاةُ، وَٱلْحَيَاةُ كَانَتْ نُورَ ٱلنَّاسِ،
          وَٱلنُّورُ يُضِيءُ فِي ٱلظُّلْمَةِ، وَٱلظُّلْمَةُ لَمْ تُدْرِكْهُ.
        </Typography>
      </Popover>
    </div>
  );
}

FontMenuItem.propTypes = {
  font: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};
