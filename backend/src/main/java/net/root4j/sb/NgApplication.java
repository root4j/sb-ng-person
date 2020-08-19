package net.root4j.sb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = {"net.root4j.sb"})
@EnableJpaRepositories(basePackages = "net.root4j.sb.repositories")
@EnableTransactionManagement
@EntityScan(basePackages = "net.root4j.sb.entities")
public class NgApplication {

    public static void main(String[] args) {
        SpringApplication.run(NgApplication.class, args);
    }
}
