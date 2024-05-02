package fr.iut.ab.pkdxapi.configurations;
import fr.iut.ab.pkdxapi.filters.JwtRequestFilter;

import fr.iut.ab.pkdxapi.services.AuthEntryPointJwt;
import fr.iut.ab.pkdxapi.services.CustomUserDetailsService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private UserDetailsService userDetailsService;
    private JwtRequestFilter jwtRequestFilter;
    private AuthEntryPointJwt  authEntryPointJwt;
    public SecurityConfiguration(CustomUserDetailsService userDetailsService, JwtRequestFilter jwtRequestFilter, AuthEntryPointJwt authEntryPointJwt) {
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.authEntryPointJwt = authEntryPointJwt;
    }


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    @Primary
    public AuthenticationManagerBuilder configureAuthenticationManagerBuilder(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authorizeRequests) ->
            authorizeRequests
                .requestMatchers(HttpMethod.PUT, "/pkmn/**", "/pkmn").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/pkmn/**", "/pkmn").hasAuthority("ROLE_ADMIN")
                .requestMatchers("/pkmn/**", "/pkmn").permitAll()

                .requestMatchers(HttpMethod.GET,"/trainer/**", "/trainer").permitAll()
                .requestMatchers("/trainer/**", "/trainer").authenticated()

                .requestMatchers(HttpMethod.PUT, "/users/admin").permitAll()
                .requestMatchers("/users/login", "/users/register", "/users/logged").permitAll()
                .requestMatchers("/users/me").authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .exceptionHandling(except -> except.authenticationEntryPoint(authEntryPointJwt))
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(Customizer.withDefaults()).csrf(csrf->csrf.disable());

        return http.build();
    }
}
