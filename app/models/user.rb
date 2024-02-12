class User < ApplicationRecord
    has_secure_password

    before_validation :ensure_session_token

    validates :email,
        uniqueness: true,
        length: { in: 3..100 },
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :name,
        presence: true,
        format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
    validates :session_token, presence: true, uniqueness: true
    # validates :password_digest, presence: true
    validates :password, length: { in: 6..40 }, allow_nil: true

    def self.find_by_credentials(credential, password)
        user = User.find_by(email: credential)

        if user&.authenticate(password)
            user
        else
            nil
        end
    end

    def reset_session_token!
        session_token = generate_unique_session_token
        self.update!(session_token: session_token)
        session_token
    end

    private

    def generate_unique_session_token
        loop do
            random_token = SecureRandom.base64
            next if User.exists?(session_token: random_token)
            return random_token
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end