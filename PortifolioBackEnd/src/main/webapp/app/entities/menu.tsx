import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/project">
        <Translate contentKey="global.menu.entities.project" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/post">
        <Translate contentKey="global.menu.entities.post" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/photo">
        <Translate contentKey="global.menu.entities.photo" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/video">
        <Translate contentKey="global.menu.entities.video" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/abukar-user">
        <Translate contentKey="global.menu.entities.abukarUser" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
