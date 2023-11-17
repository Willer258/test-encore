/* eslint-disabled */
import TenantExtend from "./extends/TenantExtend";

export default class Tenant extends TenantExtend {

public id = '';
public label = '';
public code = '';
public photo? = '';

  constructor (object?: any) {
      super(object)
      if(object){
       this.id= object.id;
       this.label= object.label;
       this.code= object.code;
       this.photo= object.photo;
      }
      this.postConstruct()
  }

}
