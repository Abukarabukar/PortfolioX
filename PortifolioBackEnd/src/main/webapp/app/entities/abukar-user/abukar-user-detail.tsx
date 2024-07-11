import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './abukar-user.reducer';

export const AbukarUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const abukarUserEntity = useAppSelector(state => state.abukarUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="abukarUserDetailsHeading">
          <Translate contentKey="portfolioApp.abukarUser.detail.title">AbukarUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.id}</dd>
          <dt>
            <span id="login">
              <Translate contentKey="portfolioApp.abukarUser.login">Login</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.login}</dd>
          <dt>
            <span id="passwordHash">
              <Translate contentKey="portfolioApp.abukarUser.passwordHash">Password Hash</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.passwordHash}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="portfolioApp.abukarUser.email">Email</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.email}</dd>
          <dt>
            <span id="activated">
              <Translate contentKey="portfolioApp.abukarUser.activated">Activated</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.activated ? 'true' : 'false'}</dd>
          <dt>
            <span id="langKey">
              <Translate contentKey="portfolioApp.abukarUser.langKey">Lang Key</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.langKey}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="portfolioApp.abukarUser.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.imageUrl}</dd>
          <dt>
            <span id="activationKey">
              <Translate contentKey="portfolioApp.abukarUser.activationKey">Activation Key</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.activationKey}</dd>
          <dt>
            <span id="resetKey">
              <Translate contentKey="portfolioApp.abukarUser.resetKey">Reset Key</Translate>
            </span>
          </dt>
          <dd>{abukarUserEntity.resetKey}</dd>
          <dt>
            <span id="resetDate">
              <Translate contentKey="portfolioApp.abukarUser.resetDate">Reset Date</Translate>
            </span>
          </dt>
          <dd>
            {abukarUserEntity.resetDate ? <TextFormat value={abukarUserEntity.resetDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/abukar-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/abukar-user/${abukarUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AbukarUserDetail;
