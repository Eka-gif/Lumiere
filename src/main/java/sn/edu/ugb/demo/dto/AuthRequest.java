package sn.edu.ugb.demo.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthRequest {

    @NotBlank(message = "Le username est obligatoire")
    private String username;

    @NotBlank(message = "Le password est obligatoire")
    private String password;

    public AuthRequest() {
    }

    public AuthRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter username
    public String getUsername() {
        return username;
    }

    // Setter username
    public void setUsername(String username) {
        this.username = username;
    }

    // Getter password
    public String getPassword() {
        return password;
    }

    // Setter password
    public void setPassword(String password) {
        this.password = password;
    }
}