import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './photo.reducer';

export const PhotoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const photoEntity = useAppSelector(state => state.photo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="photoDetailsHeading">
          <Translate contentKey="portfolioApp.photo.detail.title">Photo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{photoEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="portfolioApp.photo.title">Title</Translate>
            </span>
          </dt>
          <dd>{photoEntity.title}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="portfolioApp.photo.url">Url</Translate>
            </span>
          </dt>
          <dd>{photoEntity.url}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="portfolioApp.photo.date">Date</Translate>
            </span>
          </dt>
          <dd>{photoEntity.date ? <TextFormat value={photoEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="portfolioApp.photo.abukarUser">Abukar User</Translate>
          </dt>
          <dd>{photoEntity.abukarUser ? photoEntity.abukarUser.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/photo" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/photo/${photoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PhotoDetail;
