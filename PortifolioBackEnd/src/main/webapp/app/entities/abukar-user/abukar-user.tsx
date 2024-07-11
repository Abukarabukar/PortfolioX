import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './abukar-user.reducer';

export const AbukarUser = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const abukarUserList = useAppSelector(state => state.abukarUser.entities);
  const loading = useAppSelector(state => state.abukarUser.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="abukar-user-heading" data-cy="AbukarUserHeading">
        <Translate contentKey="portfolioApp.abukarUser.home.title">Abukar Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="portfolioApp.abukarUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/abukar-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="portfolioApp.abukarUser.home.createLabel">Create new Abukar User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {abukarUserList && abukarUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="portfolioApp.abukarUser.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('login')}>
                  <Translate contentKey="portfolioApp.abukarUser.login">Login</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('login')} />
                </th>
                <th className="hand" onClick={sort('passwordHash')}>
                  <Translate contentKey="portfolioApp.abukarUser.passwordHash">Password Hash</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('passwordHash')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="portfolioApp.abukarUser.email">Email</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('activated')}>
                  <Translate contentKey="portfolioApp.abukarUser.activated">Activated</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activated')} />
                </th>
                <th className="hand" onClick={sort('langKey')}>
                  <Translate contentKey="portfolioApp.abukarUser.langKey">Lang Key</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('langKey')} />
                </th>
                <th className="hand" onClick={sort('imageUrl')}>
                  <Translate contentKey="portfolioApp.abukarUser.imageUrl">Image Url</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imageUrl')} />
                </th>
                <th className="hand" onClick={sort('activationKey')}>
                  <Translate contentKey="portfolioApp.abukarUser.activationKey">Activation Key</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('activationKey')} />
                </th>
                <th className="hand" onClick={sort('resetKey')}>
                  <Translate contentKey="portfolioApp.abukarUser.resetKey">Reset Key</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('resetKey')} />
                </th>
                <th className="hand" onClick={sort('resetDate')}>
                  <Translate contentKey="portfolioApp.abukarUser.resetDate">Reset Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('resetDate')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {abukarUserList.map((abukarUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/abukar-user/${abukarUser.id}`} color="link" size="sm">
                      {abukarUser.id}
                    </Button>
                  </td>
                  <td>{abukarUser.login}</td>
                  <td>{abukarUser.passwordHash}</td>
                  <td>{abukarUser.email}</td>
                  <td>{abukarUser.activated ? 'true' : 'false'}</td>
                  <td>{abukarUser.langKey}</td>
                  <td>{abukarUser.imageUrl}</td>
                  <td>{abukarUser.activationKey}</td>
                  <td>{abukarUser.resetKey}</td>
                  <td>{abukarUser.resetDate ? <TextFormat type="date" value={abukarUser.resetDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/abukar-user/${abukarUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/abukar-user/${abukarUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/abukar-user/${abukarUser.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="portfolioApp.abukarUser.home.notFound">No Abukar Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AbukarUser;
