import { Component, OnInit, Input } from '@angular/core';
import { UserLogueado } from 'src/app/Models/UserLogueado';
import { LicenciaService } from 'src/app/Core/Licencia/licencia.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Core/Services/auth/auth.service';
import { AppDataService } from 'src/app/Core/Services/Data/app-data.service';
import { HttpClient } from '@angular/common/http';
import { TipoLicencia } from 'src/app/Models/TipoLicencia';
import { PagoService } from 'src/app/Core/Services/Pago/pago.service';
import { Pago } from 'src/app/Models/Pago';

declare var Stripe;

@Component({
  selector: 'pago-componente',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
})
export class StripeComponent implements OnInit {

  stripe = Stripe('pk_test_51HGRIKKfdYGqLAntoRitpgmOW1cFQhMZxfxR4mpS6HbyPqJYbu5kgPgUK75UJQK8VDgtVA849ld3UB2uw13KLKmI00deh3n6SE');
  card: any;
  currentUser: UserLogueado = null;

  @Input() tipoLicencia: TipoLicencia;
  @Input() cantidadMeses: number;

  totalAbonar: number = 0

  constructor(private translate: TranslateService, private http: HttpClient, private pagoService: PagoService,
    private authService: AuthService, private licenciaService: LicenciaService, private appDataService: AppDataService) {}
  
  ngOnInit() {

    this.setupStripe();
    this.authService.getUserSubject().subscribe(
      data => {
        console.log(data)
        this.currentUser = data
      },
      error => console.log(error)
    );
  }

  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { 
      style: style,
      hidePostalCode: true 
    
    });
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(event)

      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {

          const pago: Pago = {
            empresaId: this.currentUser.empresaId,
            tokenPago: result.source.id,
            id: null,
            medioPagoId: 1,
            monto: this.cantidadMeses * this.tipoLicencia.precioActual
          }

          console.log(pago)
          this.pagoService.registrarPago(pago).subscribe(
            data => {
              console.log('Operacion Exitosa')
              //actualizar Licencia Empresa
            },
            (error) => console.log(error)
          )
          //this.makePayment(result.id);
        }
      });
    });
  }

  makePayment(token) {
    this.http
    .post(
   'https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe', {
    amount: this.totalAbonar,
    currency: "ars",
    token: token.id
    })
    .subscribe(data => {
    console.log(data);
    });
   }

}