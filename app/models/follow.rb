class Follow < ApplicationRecord
    validates :follower_id, uniqueness: {
        scope: :user_id,
        message: "can only follow a user once"
    }
    validate :conflict_of_interest
    
    belongs_to :follower,
        primary_key: :id,
        foreign_key: :follower_id,
        class_name: :User

    belongs_to :leader,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    def conflict_of_interest
        if self.follower_id === self.user_id
            self.errors.add :conflict, "- you cannot follow yourself"
        end
    end
end
