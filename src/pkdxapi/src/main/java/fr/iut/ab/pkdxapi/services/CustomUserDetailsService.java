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

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) {

        Optional<UserData> userData = userRepository.findByLogin(login);

        if (userData == null) {
            throw new UsernameNotFoundException("User not found");
        }

        UserData user = userData.get();

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(AuthorityUtils.createAuthorityList("ROLE_USER").get(0));

        if (user.getIsAdmin()) {
            authorities.add(AuthorityUtils.createAuthorityList("ROLE_ADMIN").get(0));
        }

        UserDetails userDetails = User.builder()
            .username(user.getLogin())
            .password(user.getPassword())
            .authorities(authorities)
            .build();

        return userDetails;
    }
}