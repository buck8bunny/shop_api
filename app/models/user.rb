class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :orders

  # Define enum for roles
  # enum role: { user: 0, admin: 1 }
  def self.roles
    { user: 0, admin: 1 }
  end
  
  def role
    self[:role] && self.class.roles.key(self[:role])
  end
  
  def role=(value)
    self[:role] = self.class.roles[value.to_sym]
  end
  

  # Validations
  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true
end
