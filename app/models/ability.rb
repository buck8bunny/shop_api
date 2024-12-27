class Ability
  include CanCan::Ability

  def initialize(user)
    # Пример прав доступа
    if user.present? && user.admin?
      can :manage, :all
    end
  
  end
end
