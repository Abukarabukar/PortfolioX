import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './video.reducer';

export const VideoDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const videoEntity = useAppSelector(state => state.video.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="videoDetailsHeading">
          <Translate contentKey="portfolioApp.video.detail.title">Video</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{videoEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="portfolioApp.video.title">Title</Translate>
            </span>
          </dt>
          <dd>{videoEntity.title}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="portfolioApp.video.url">Url</Translate>
            </span>
          </dt>
          <dd>{videoEntity.url}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="portfolioApp.video.date">Date</Translate>
            </span>
          </dt>
          <dd>{videoEntity.date ? <TextFormat value={videoEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="portfolioApp.video.abukarUser">Abukar User</Translate>
          </dt>
          <dd>{videoEntity.abukarUser ? videoEntity.abukarUser.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/video" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/video/${videoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default VideoDetail;
