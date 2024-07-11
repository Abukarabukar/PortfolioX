import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AbukarUser from './abukar-user';
import AbukarUserDetail from './abukar-user-detail';
import AbukarUserUpdate from './abukar-user-update';
import AbukarUserDeleteDialog from './abukar-user-delete-dialog';

const AbukarUserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AbukarUser />} />
    <Route path="new" element={<AbukarUserUpdate />} />
    <Route path=":id">
      <Route index element={<AbukarUserDetail />} />
      <Route path="edit" element={<AbukarUserUpdate />} />
      <Route path="delete" element={<AbukarUserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AbukarUserRoutes;
