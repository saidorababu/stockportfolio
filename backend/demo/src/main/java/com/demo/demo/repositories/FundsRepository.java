package com.demo.demo.repositories;

import com.demo.demo.models.Funds;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundsRepository extends JpaRepository<Funds, Long> {

    Funds findByUserId(Long userId);
}
