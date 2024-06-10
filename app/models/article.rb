class Article < ApplicationRecord
    include ActionView::Helpers::DateHelper 

    # Validations
    validates :title,
        length: { in: 1..255 }
    validates :body,
        length: { in: 1..65535 }

    # Associations
    belongs_to :author,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    has_many :claps, as: :clappable

    has_many :clappers,
        through: :claps,
        source: :clapper

    has_one_attached :photo

    def updated_in_words_without_year
        self.updated_at.strftime("%B %e")
    end

    def updated_in_words_with_year
        self.updated_at.strftime("%B %e, %Y")
    end

    def created_in_words_without_year
        self.created_at.strftime("%B %e")
    end

    def created_in_words_with_year
        self.created_at.strftime("%B %e, %Y")
    end

    def reading_time
        words = self.body.split(" ")
        minutes = (words.length/150).ceil
        minutes == 0 ? 1 : minutes
    end
end