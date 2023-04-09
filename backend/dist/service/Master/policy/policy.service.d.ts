import { Repository } from 'typeorm';
import { Policy } from 'src/entities/Policy';
export declare class PolicyService {
    private policyRepository;
    constructor(policyRepository: Repository<Policy>);
    findAllPolicy(): Promise<any>;
    findOnePolicy(poliId: number): Promise<any>;
    getPolicyByName(name: string): Promise<any>;
    getPolicyByCategory(name: string): Promise<any>;
    createPolicy(data: Policy): Promise<Policy>;
    updatePolicy(poliId: number, data: Policy): Promise<any>;
    deletePolicy(poliId: number): Promise<any>;
}
