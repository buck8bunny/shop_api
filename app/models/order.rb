class Order < ApplicationRecord
  belongs_to :user
  has_many :order_descriptions, dependent: :destroy
  accepts_nested_attributes_for :order_descriptions
  
  validates :amount, numericality: { greater_than_or_equal_to: 0 }
end
