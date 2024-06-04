class Clap < ApplicationRecord
    validates :amount, presence: true, numericality: {only_integer: true}
    validates :clapper_id, uniqueness: {
        scope: [:clappable_type, :clappable_id],
    }
    validate :conflict_of_interest

    belongs_to :clappable, polymorphic: true

    def conflict_of_interest
        foreign_class = self.clappable_type.constantize
        foreign_id = self.clappable_id
        clapped_object = foreign_class.find(foreign_id)
        if clapped_object.user_id == self.clapper_id
            self.errors.add :conflict, "You cannot applaud your own content"
        end
    end
end