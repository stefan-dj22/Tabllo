package com.gitproject.Tabllo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Collections;

@SpringBootApplication
@EnableJpaRepositories
public class TablloApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(TablloApplication.class);
		app.setDefaultProperties(Collections
				.singletonMap("server.port", "8083"));
		app.run(args);
		SpringApplication.run(TablloApplication.class, args);
	}

}
