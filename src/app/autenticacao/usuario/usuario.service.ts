
import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { Usuario } from './Usuario';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService : TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodificaJwt();
    }
  }

  private decodificaJwt(){

    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario(){
    return this.usuarioSubject.asObservable();
  }

  salvarToken(token: string){
    this.tokenService.salvaToken(token);
    this.decodificaJwt();
  }

  logout(){
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }

}