//package com.example.shoestore.configuration;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import javax.crypto.spec.SecretKeySpec;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Value("${jwt.signerKey}")
//    private String signerKey;
//
//    private final String[] PUBLIC_ENDPOINTS = {
//            "/users",
//            "/auth/token",
//            "/auth/introspect"
//    };
//
//    @Bean
//    // Nó định nghĩa các quy tắc bảo mật cho các yêu cầu HTTP đến ứng dụng
//    // Phương thức này sẽ được gọi khi ứng dụng khởi động để cấu hình bảo mật cho ứng dụng
//    // Ví dụ : admin được truy cập vào các endpoint /users, /products
//    // và người dùng bình thường chỉ được truy cập vào /products
//
//    // Phương thức này trả về một SecurityFilterChain, đại diện cho chuỗi bộ lọc bảo mật sẽ được áp dụng cho các yêu cầu HTTP
//    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity
//                .csrf(AbstractHttpConfigurer::disable)
//                .cors(cors -> {}) // bật CORS (sẽ dùng WebConfig)
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
//                        .requestMatchers(HttpMethod.GET, "/users").hasAuthority("SCOPE_ADMIN")// chỉ cho phép người dùng có quyền ADMIN truy cập
//                        .requestMatchers(HttpMethod.GET, "/users/**").hasAuthority("SCOPE_USER")// chỉ cho phép người dùng có quyền USER truy cập
//                        .requestMatchers(HttpMethod.GET, "/products").permitAll() // cho phép tất cả
//                        .anyRequest().authenticated()// yêu cầu xác thực cho tất cả các yêu cầu khác
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())));
//
//        return httpSecurity.build();
//    }
//
//    @Bean
//    public JwtDecoder jwtDecoder() {
//        SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HmacSHA512");
//        return NimbusJwtDecoder
//                .withSecretKey(secretKeySpec)
//                .macAlgorithm(MacAlgorithm.HS512)
//                .build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder(10);
//    }
//}

package com.example.shoestore.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {}) // bật CORS
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 🔥 Cho phép tất cả request không cần login
                )
                .oauth2ResourceServer(oauth2 -> oauth2.disable()); // 🔥 Tắt luôn oauth2 resource server

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
}

