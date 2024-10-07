package nu.ams.services;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import nu.ams.dto.auth.AuthenticationRequest;
import nu.ams.dto.auth.AuthenticationResponse;
import nu.ams.dto.auth.RegisterRequest;
import nu.ams.entities.User;
import nu.ams.enums.UserRole;
import nu.ams.exceptions.DuplicateResourceException;
import nu.ams.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostConstruct
    public void createAdminAccount() {
        String adminEmail = "ams.admin@gmail.com";
        String adminPassword = "admin";
        Optional<User> adminAccount = userRepository.findByEmail(adminEmail);
        if (adminAccount.isEmpty()) {
            User user = new User();
            user.setEmail(adminEmail);
            user.setFirstName("Admin");
            user.setLastName("Admin");
            user.setRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode(adminPassword));
            userRepository.save(user);
            System.out.println("Admin account created successfully!");
            System.out.println("email: " + user.getEmail());
            System.out.println("password: admin");
        } else {
            System.out.println("Admin account already exists!");
        }
    }

    public void addAlumniUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException(
                    "User with email %s already exists!".formatted(request.getEmail()));
        }
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.ALUMNI)
                .build();
        userRepository.save(user);
    }

    public void addManagerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException(
                    "User with email %s already exists!".formatted(request.getEmail()));
        }
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.MANAGER)
                .build();
        userRepository.save(user);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new UsernameNotFoundException("User not found!")
        );
        var jwtToken = jwtService.generateToken(user, String.valueOf(user.getRole()));

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userRole(user.getRole())
                .build();
    }
}
