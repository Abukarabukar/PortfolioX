import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAbukarUser } from 'app/shared/model/abukar-user.model';
import { getEntity, updateEntity, createEntity, reset } from './abukar-user.reducer';

export const AbukarUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const abukarUserEntity = useAppSelector(state => state.abukarUser.entity);
  const loading = useAppSelector(state => state.abukarUser.loading);
  const updating = useAppSelector(state => state.abukarUser.updating);
  const updateSuccess = useAppSelector(state => state.abukarUser.updateSuccess);

  const handleClose = () => {
    navigate('/abukar-user');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.resetDate = convertDateTimeToServer(values.resetDate);

    const entity = {
      ...abukarUserEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          resetDate: displayDefaultDateTime(),
        }
      : {
          ...abukarUserEntity,
          resetDate: convertDateTimeFromServer(abukarUserEntity.resetDate),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="portfolioApp.abukarUser.home.createOrEditLabel" data-cy="AbukarUserCreateUpdateHeading">
            <Translate contentKey="portfolioApp.abukarUser.home.createOrEditLabel">Create or edit a AbukarUser</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="abukar-user-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('portfolioApp.abukarUser.login')}
                id="abukar-user-login"
                name="login"
                data-cy="login"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 1, message: translate('entity.validation.minlength', { min: 1 }) },
                }}
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.passwordHash')}
                id="abukar-user-passwordHash"
                name="passwordHash"
                data-cy="passwordHash"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.email')}
                id="abukar-user-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' }),
                  },
                }}
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.activated')}
                id="abukar-user-activated"
                name="activated"
                data-cy="activated"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.langKey')}
                id="abukar-user-langKey"
                name="langKey"
                data-cy="langKey"
                type="text"
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.imageUrl')}
                id="abukar-user-imageUrl"
                name="imageUrl"
                data-cy="imageUrl"
                type="text"
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.activationKey')}
                id="abukar-user-activationKey"
                name="activationKey"
                data-cy="activationKey"
                type="text"
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.resetKey')}
                id="abukar-user-resetKey"
                name="resetKey"
                data-cy="resetKey"
                type="text"
              />
              <ValidatedField
                label={translate('portfolioApp.abukarUser.resetDate')}
                id="abukar-user-resetDate"
                name="resetDate"
                data-cy="resetDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/abukar-user" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AbukarUserUpdate;
