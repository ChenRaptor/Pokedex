package fr.iut.ab.pkdxapi.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Adjust the path to match your API endpoints
            .allowedOrigins("http://localhost:3000", "http://localhost:8080") // Allow requests from localhost:3000
            .allowedMethods("GET", "POST", "PUT", "DELETE"); // Allow these HTTP methods
    }
}
