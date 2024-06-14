class User < ApplicationRecord
    # Auth Pattern
    has_secure_password
    before_validation :ensure_session_token

    # Validations
    validates :email,
        uniqueness: true,
        length: { in: 3..100 },
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :name,
        presence: true,
        format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..40 }, allow_nil: true

    # Associations
    has_many :articles,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Article

    has_many :claps,
        primary_key: :id,
        foreign_key: :clapper_id,
        class_name: :Clap

    # The follows where you are the user following another user:
    has_many :follows,
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :Follow

    # The follows where you are the user being followed:
    has_many :leads,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Follow

    # The users who are following your content:
    has_many :followers,
        through: :leads,
        source: :follower

    # The users whose content you are following:
    has_many :following,
        through: :follows,
        source: :leader

    has_one_attached :photo

    # Auth Pattern
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