package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AbukarUser.
 */
@Entity
@Table(name = "abukar_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AbukarUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 1)
    @Column(name = "login", nullable = false)
    private String login;

    @NotNull
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "activated")
    private Boolean activated;

    @Column(name = "lang_key")
    private String langKey;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "activation_key")
    private String activationKey;

    @Column(name = "reset_key")
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "abukarUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "abukarUser" }, allowSetters = true)
    private Set<Project> projects = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "abukarUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "abukarUser" }, allowSetters = true)
    private Set<Post> posts = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "abukarUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "abukarUser" }, allowSetters = true)
    private Set<Photo> photos = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "abukarUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "abukarUser" }, allowSetters = true)
    private Set<Video> videos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AbukarUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return this.login;
    }

    public AbukarUser login(String login) {
        this.setLogin(login);
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPasswordHash() {
        return this.passwordHash;
    }

    public AbukarUser passwordHash(String passwordHash) {
        this.setPasswordHash(passwordHash);
        return this;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return this.email;
    }

    public AbukarUser email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActivated() {
        return this.activated;
    }

    public AbukarUser activated(Boolean activated) {
        this.setActivated(activated);
        return this;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return this.langKey;
    }

    public AbukarUser langKey(String langKey) {
        this.setLangKey(langKey);
        return this;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public AbukarUser imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getActivationKey() {
        return this.activationKey;
    }

    public AbukarUser activationKey(String activationKey) {
        this.setActivationKey(activationKey);
        return this;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return this.resetKey;
    }

    public AbukarUser resetKey(String resetKey) {
        this.setResetKey(resetKey);
        return this;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return this.resetDate;
    }

    public AbukarUser resetDate(Instant resetDate) {
        this.setResetDate(resetDate);
        return this;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Project> projects) {
        if (this.projects != null) {
            this.projects.forEach(i -> i.setAbukarUser(null));
        }
        if (projects != null) {
            projects.forEach(i -> i.setAbukarUser(this));
        }
        this.projects = projects;
    }

    public AbukarUser projects(Set<Project> projects) {
        this.setProjects(projects);
        return this;
    }

    public AbukarUser addProject(Project project) {
        this.projects.add(project);
        project.setAbukarUser(this);
        return this;
    }

    public AbukarUser removeProject(Project project) {
        this.projects.remove(project);
        project.setAbukarUser(null);
        return this;
    }

    public Set<Post> getPosts() {
        return this.posts;
    }

    public void setPosts(Set<Post> posts) {
        if (this.posts != null) {
            this.posts.forEach(i -> i.setAbukarUser(null));
        }
        if (posts != null) {
            posts.forEach(i -> i.setAbukarUser(this));
        }
        this.posts = posts;
    }

    public AbukarUser posts(Set<Post> posts) {
        this.setPosts(posts);
        return this;
    }

    public AbukarUser addPost(Post post) {
        this.posts.add(post);
        post.setAbukarUser(this);
        return this;
    }

    public AbukarUser removePost(Post post) {
        this.posts.remove(post);
        post.setAbukarUser(null);
        return this;
    }

    public Set<Photo> getPhotos() {
        return this.photos;
    }

    public void setPhotos(Set<Photo> photos) {
        if (this.photos != null) {
            this.photos.forEach(i -> i.setAbukarUser(null));
        }
        if (photos != null) {
            photos.forEach(i -> i.setAbukarUser(this));
        }
        this.photos = photos;
    }

    public AbukarUser photos(Set<Photo> photos) {
        this.setPhotos(photos);
        return this;
    }

    public AbukarUser addPhoto(Photo photo) {
        this.photos.add(photo);
        photo.setAbukarUser(this);
        return this;
    }

    public AbukarUser removePhoto(Photo photo) {
        this.photos.remove(photo);
        photo.setAbukarUser(null);
        return this;
    }

    public Set<Video> getVideos() {
        return this.videos;
    }

    public void setVideos(Set<Video> videos) {
        if (this.videos != null) {
            this.videos.forEach(i -> i.setAbukarUser(null));
        }
        if (videos != null) {
            videos.forEach(i -> i.setAbukarUser(this));
        }
        this.videos = videos;
    }

    public AbukarUser videos(Set<Video> videos) {
        this.setVideos(videos);
        return this;
    }

    public AbukarUser addVideo(Video video) {
        this.videos.add(video);
        video.setAbukarUser(this);
        return this;
    }

    public AbukarUser removeVideo(Video video) {
        this.videos.remove(video);
        video.setAbukarUser(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AbukarUser)) {
            return false;
        }
        return getId() != null && getId().equals(((AbukarUser) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AbukarUser{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", passwordHash='" + getPasswordHash() + "'" +
            ", email='" + getEmail() + "'" +
            ", activated='" + getActivated() + "'" +
            ", langKey='" + getLangKey() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", activationKey='" + getActivationKey() + "'" +
            ", resetKey='" + getResetKey() + "'" +
            ", resetDate='" + getResetDate() + "'" +
            "}";
    }
}
