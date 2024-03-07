package fr.iut.ab.pkdxapi.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import fr.iut.ab.pkdxapi.models.UserData;
import fr.iut.ab.pkdxapi.repositories.UserRepository;

import org.springframework.security.core.userdetails.User;

public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;
    private List<GrantedAuthority> authorities = new ArrayList<>();

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
        authorities.add(AuthorityUtils.createAuthorityList("ROLE_USER").get(0));
    }

    @Override
    public UserDetails loadUserByUsername(String login) {
        Optional<UserData> userData = userRepository.findByLogin(login);
        if (userData == null) {
            throw new UsernameNotFoundException("User not found");
        }
        UserData user = userData.get();
        return new User(user.getLogin(), user.getPassword(), authorities);
    }
}