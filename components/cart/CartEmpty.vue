<template>
  <div>
    <transition name="fade">
      <div class="row py-5 p-4 bg-white rounded shadow-sm empty-cart">
        <div class="col-12">
          <div
            class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold text-center mb-5"
          >
            Cart is empty
          </div>
          <ul class="list-inline">
            <li class="list-inline-item">
              <n-link to="/shop" class="btn btn-dark rounded-pill py-2">
                Go Shopping!
              </n-link>
            </li>
            <li class="list-inline-item">
              <n-link to="/account" class="btn btn-dark rounded-pill py-2">
                My Account
              </n-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
