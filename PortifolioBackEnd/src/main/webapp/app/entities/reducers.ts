import project from 'app/entities/project/project.reducer';
import post from 'app/entities/post/post.reducer';
import photo from 'app/entities/photo/photo.reducer';
import video from 'app/entities/video/video.reducer';
import abukarUser from 'app/entities/abukar-user/abukar-user.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  project,
  post,
  photo,
  video,
  abukarUser,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
