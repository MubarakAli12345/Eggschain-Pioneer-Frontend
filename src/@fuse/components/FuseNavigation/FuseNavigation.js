import React from "react";
import { Divider, List } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import FuseNavVerticalGroup from "./vertical/FuseNavVerticalGroup";
import FuseNavVerticalCollapse from "./vertical/FuseNavVerticalCollapse";
import FuseNavVerticalItem from "./vertical/FuseNavVerticalItem";
import FuseNavVerticalLink from "./vertical/FuseNavVerticalLink";
import FuseNavHorizontalGroup from "./horizontal/FuseNavHorizontalGroup";
import FuseNavHorizontalCollapse from "./horizontal/FuseNavHorizontalCollapse";
import FuseNavHorizontalItem from "./horizontal/FuseNavHorizontalItem";
import FuseNavHorizontalLink from "./horizontal/FuseNavHorizontalLink";

function FuseNavigation(props) {
  const { navigation, layout, active, dense, className } = props;

  console.log("local", localStorage);
  console.log("Navigation", navigation);

  let currentRole;
  const { role } = localStorage;

  if (role === "user") {
    currentRole = navigation[0];
  } else if (role === "clinic") {
    currentRole = navigation[1];
  } else {
    currentRole = navigation[0];
  }

  const verticalNav = (
    <List className={clsx("navigation whitespace-no-wrap", className)}>
      {/* {currentRole.type === "group" && (
        <FuseNavVerticalGroup
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && (
        <FuseNavVerticalCollapse
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && (
        <FuseNavVerticalItem
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "link" && (
        <FuseNavVerticalLink
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )} */}
      {currentRole.type === "link" && role === "user" && (
        <FuseNavVerticalLink
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "group" && role === "user" && (
        <FuseNavVerticalGroup
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && role === "user" && (
        <FuseNavVerticalCollapse
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && role === "user" && (
        <FuseNavVerticalItem
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}

      {currentRole.type === "link" && role === "clinic" && (
        <FuseNavVerticalLink
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "group" && role === "clinic" && (
        <FuseNavVerticalGroup
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && role === "clinic" && (
        <FuseNavVerticalCollapse
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && role === "clinic" && (
        <FuseNavVerticalItem
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "link" && role === "clinic" && (
        <FuseNavVerticalLink
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "group" && role === "clinic" && (
        <FuseNavVerticalGroup
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && role === "clinic" && (
        <FuseNavVerticalCollapse
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && role === "clinic" && (
        <FuseNavVerticalItem
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {role === "clinic" && <FuseNavVerticalItem item={navigation[3]} />}

      {currentRole.type === "divider" && <Divider className="my-16" />}

      {/* {
          {currentRole.type}
        // navigation.map((item) => (
        //     <React.Fragment key={item.id}>
        //         {item.type === 'group' && (
        //             <FuseNavVerticalGroup item={item} nestedLevel={0} active={active} dense={dense}/>
        //         )}
                // {item.type === 'collapse' && (
                //     <FuseNavVerticalCollapse item={item} nestedLevel={0} active={active} dense={dense}/>
                // )}
                // {item.type === 'item' && (
                //     <FuseNavVerticalItem item={item} nestedLevel={0} active={active} dense={dense}/>
                // )}
                // {item.type === 'link' && (
                //     <FuseNavVerticalLink item={item} nestedLevel={0} active={active} dense={dense}/>
                // )}
                // {item.type === 'divider' && (
                //     <Divider className="my-16"/>
                // )}
        //     </React.Fragment>
        // ))
        // <FuseNavVerticalCollapse item={navigation[1]} />
      } */}
    </List>
  );

  const horizontalNav = (
    <List className={clsx("navigation whitespace-no-wrap flex p-0", className)}>
      {currentRole.type === "link" && role === "user" && (
        <FuseNavHorizontalLink
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "group" && role === "user" && (
        <FuseNavHorizontalGroup
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && role === "user" && (
        <FuseNavHorizontalCollapse
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && role === "user" && (
        <FuseNavHorizontalItem
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}

      {currentRole.type === "link" && role === "clinic" && (
        <FuseNavHorizontalLink
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "group" && role === "clinic" && (
        <FuseNavHorizontalGroup
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && role === "clinic" && (
        <FuseNavHorizontalCollapse
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && role === "clinic" && (
        <FuseNavHorizontalItem
          item={navigation[0]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "link" && role === "clinic" && (
        <FuseNavHorizontalLink
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "group" && role === "clinic" && (
        <FuseNavHorizontalGroup
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && role === "clinic" && (
        <FuseNavHorizontalCollapse
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && role === "clinic" && (
        <FuseNavHorizontalItem
          item={navigation[1]}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}

      {/* {currentRole.type === "group" && (
        <FuseNavHorizontalGroup
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "collapse" && (
        <FuseNavHorizontalCollapse
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "item" && (
        <FuseNavHorizontalItem
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )}
      {currentRole.type === "link" && (
        <FuseNavHorizontalLink
          item={currentRole}
          nestedLevel={0}
          active={active}
          dense={dense}
        />
      )} */}

      {/* {navigation.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === "group" && (
            <FuseNavHorizontalGroup item={item} nestedLevel={0} dense={dense} />
          )}

          {item.type === "collapse" && (
            <FuseNavHorizontalCollapse
              item={item}
              nestedLevel={0}
              dense={dense}
            />
          )}

          {item.type === "item" && (
            <FuseNavHorizontalItem item={item} nestedLevel={0} dense={dense} />
          )}

          {item.type === "link" && (
            <FuseNavHorizontalLink item={item} nestedLevel={0} dense={dense} />
          )}

          {item.type === "divider" && <Divider className="my-16" />}
        </React.Fragment>
      ))} */}
    </List>
  );

  if (navigation.length > 0) {
    switch (layout) {
      case "horizontal": {
        return horizontalNav;
      }
      case "vertical":
      default: {
        return verticalNav;
      }
    }
  } else {
    return null;
  }
}

FuseNavigation.propTypes = {
  navigation: PropTypes.array.isRequired,
};

FuseNavigation.defaultProps = {
  layout: "vertical",
};

export default React.memo(FuseNavigation);
