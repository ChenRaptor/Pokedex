package fr.iut.ab.pkdxapi.configurations;

import org.springframework.security.config.Customizer;

//import javax.crypto.spec.SecretKeySpec;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

//import fr.iut.ab.pkdxapi.repositories.UserRepository;
//import fr.iut.ab.pkdxapi.services.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  //@Autowired
  //  private UserRepository userRepository;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
          .requestMatchers("/users/register").permitAll()
          .requestMatchers(HttpMethod.GET, "/pkmn/**").permitAll()
          .requestMatchers(HttpMethod.DELETE, "/pkmn/**").hasAuthority("ROLE_ADMIN")
          .requestMatchers(HttpMethod.PUT, "/pkmn/**").hasAuthority("ROLE_ADMIN")
          .requestMatchers(HttpMethod.POST, "/pkmn/**").hasAuthority("ROLE_ADMIN")
          .requestMatchers("/users/login").authenticated() // authorize register user without authentication
          .requestMatchers("/trainer/**", "/pkmn/**", "/pkmn", "/trainer", "/trainer/mark").authenticated()
        )   // authorize all http requests with authentication
        .httpBasic(Customizer.withDefaults())
        .csrf(csrf->csrf.disable()) ; // disable csrf security to authorize post, patch & delete
      return http.build();
    }
    /*
    @Bean
    public UserDetailsService userDetailsService(){
        return new CustomUserDetailsService(userRepository);
    }*/

    @Bean
    public static PasswordEncoder passwordEncoder(){
      return new BCryptPasswordEncoder();
    }
}