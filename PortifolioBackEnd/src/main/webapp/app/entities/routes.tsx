import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Project from './project';
import Post from './post';
import Photo from './photo';
import Video from './video';
import AbukarUser from './abukar-user';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="project/*" element={<Project />} />
        <Route path="post/*" element={<Post />} />
        <Route path="photo/*" element={<Photo />} />
        <Route path="video/*" element={<Video />} />
        <Route path="abukar-user/*" element={<AbukarUser />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
