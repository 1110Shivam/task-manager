package com.mrt.taskmanager.security;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

import com.mrt.taskmanager.entity.Provider;
import com.mrt.taskmanager.entity.User;
import com.mrt.taskmanager.repository.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        org.springframework.security.oauth2.core.user.OAuth2User oauthUser = (org.springframework.security.oauth2.core.user.OAuth2User) authentication
                .getPrincipal();

        String email = oauthUser.getAttribute("email");
        if (email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Email not found from OAuth2 provider");
            return;
        }

        Optional<User> userOpt = userRepo.findByEmail(email);
        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = new User();
            user.setEmail(email);
            user.setName(oauthUser.getAttribute("name"));
            user.setProvider(Provider.GOOGLE);
            userRepo.save(user);
        }

        String token = jwtUtil.generateToken(email);

        System.out.println("################################################################################################ "+token);

        Cookie jwtCookie = new Cookie("jwt", token);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(2 * 60 * 60);
        jwtCookie.setSecure(false);
        response.addCookie(jwtCookie);
        String name = URLEncoder.encode(user.getName(), StandardCharsets.UTF_8);
        String redirectUrl = "http://localhost:5173/oauth/redirect?user=" + name;
        response.sendRedirect(redirectUrl);
    }
}