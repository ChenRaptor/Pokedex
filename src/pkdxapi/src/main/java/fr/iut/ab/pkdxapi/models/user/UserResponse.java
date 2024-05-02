package fr.iut.ab.pkdxapi.models.user;

public class UserResponse {

    private String login;
    private Boolean isAdmin;

    public UserResponse(String login, Boolean isAdmin) {
        this.login = login;
        this.isAdmin = isAdmin;
    }

    public String getLogin() {
        return login;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
}
